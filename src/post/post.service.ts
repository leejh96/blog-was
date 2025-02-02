import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GetPostDto } from './dto/get-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPostListDto } from './dto/get-post-list.dto';
import { CreatePostReqDto } from './dto/create-post.dto';
import { notExistCategory, notExistUser, serverError } from 'share/error-msg/server';

@Injectable()
export class PostService {
    constructor(
        private readonly user: UserService,
        private readonly prisma: PrismaService,
    ) { }

    async getPostList(arg: GetPostListDto) {
        const { page, limit } = arg;
        const postList = await this.prisma.post.findMany({
            where: {
                isPublished: true,
                enable: true,
            },
            include: {
                author: {
                    select: {
                        userIdx: true,
                        nickname: true,
                    }
                }
            },
            skip: (page - 1) * limit, // offset 계산
            take: limit, // 가져올 데이터 개수
        });

        return postList;
    }

    async getPost(arg: GetPostDto) {
        const { postIdx } = arg;

        /*      
            ![](https://velog.velcdn.com/images/leejh96/post/fb8e87b6-cce4-4c8f-b22a-a5c0b7c880ed/image.png)
            <div align='center'>[폰노이만 이전의 컴퓨터]</div>

            > 위 사진과 같이 폰 노이만 구조의 컴퓨터가 아니였던 시절에는 어떤 프로그램을 실행하기 위해서는 직접 전선을 바꿔가며 프로그램을 진행해야 했다. 이러한 문제점을 보완하여 지금까지 사용되는 구조가 바로 **폰노이만 구조**이다.

            **폰노이만 구조**는 **프로그램 내장 방식**으로 불리는데 크게 CPU와 Memory, DISK를 이용하여 프로그램을 실행 시킬 수 있다.

            1. CPU(Central Processing Unit)
                - **중앙처리장치**라고도 불리는 CPU는 크게 기억, 해석, 연산, 제어 기능을 관할한다.

            2. Memory
                - **주기억장치**로 불리는 메모리는 컴퓨터에서 수치, 명령, 자료 등을 저장한다.
                - 대표적인 예로 ROM(Read-Only Memory)과 RAM(Random-Access Memory)가 존재한다.

            3. DISK
                - **보조기억장치**로 불리는 디스크는 프로그램을 영구적으로 저장한다.
                - 대표적인 예로 HDD, SSD가 존재한다.

            ### 동작방식
            ![](https://velog.velcdn.com/images/leejh96/post/fb411567-30a7-47da-97b7-cbdc81fa537d/image.png)

            1. 디스크에 저장된 프로그램을 메모리에 저장한다. (이 때 모든 파일을 저장하는 것이 아닌, 파일의 일부분을 순서대로 저장한다.)
            2. 메모리에 저장된 프로그램 CPU의 연산장치(ALU)가 계산하여 계산된 결과를 CPU내의 제어장치를 통해 실행한다. (OUTPUT 장치에 보여주는 등..)


            > 이러한 프로세스를 진행시키는 것이 **운영체제(OS)**이다.
        */
        const post = await this.prisma.post.findFirst({
            where: {
                postIdx,
                enable: true,
            },
            include: {
                author: {
                    select: {
                        userIdx: true,
                        nickname: true,
                        tag: true,
                        role: true,
                        status: true,
                        enable: true,
                        profileImage: true,
                    },
                },
                postCategory: {
                    select: {
                        name: true,
                    }
                },
                postComments: {
                    include: {
                        author: {
                            select: {
                                userIdx: true,
                                nickname: true,
                                tag: true,
                                role: true,
                                status: true,
                                profileImage: true,
                            }
                        }
                    }
                }
            },
        });

        return post;
    }

    async createPost(arg: CreatePostReqDto) {
        const { title, content, isPublished, publishedAt, userIdx, postCategoryIdx } = arg;
        // 작성자 검증
        const user = await this.prisma.userInfo.findUnique({ where: { userIdx } });
        if (!user) throw new NotFoundException(notExistUser);

        // 카테고리 검증
        const category = await this.prisma.postCategory.findUnique({ where: { postCategoryIdx } });
        if (!category) throw new NotFoundException(notExistCategory);

        // 게시글 생성
        const post = await this.prisma.post.create({
            data: {
                title,
                content,
                isPublished: isPublished ?? false,
                publishedAt: publishedAt ?? null,
                userIdx,
                postCategoryIdx,
            },
        });

        if (!post) {
            throw new Error(serverError)
        }

        return post;
    }

}

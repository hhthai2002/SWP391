import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Tag } from "antd";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
import ModalDeletePost from "../components/ModalDeletePost";

export default function ManagePostByAdmin() {
    const [posts, setPosts] = useState([]);
    const [admin, setAdmin] = useState('');
    const navigate = useNavigate(); // Sử dụng useHistory
    //Thêm một trạng thái tạm thời editingState
    const [editingState, setEditingState] = useState({});
    const [selectedPostId, setSelectedPostId] = useState(null);


    useEffect(() => {
        const user = localStorage.getItem("user");
        const roleId = localStorage.getItem("roleId");
        if (!user) {
            console.error("Không có người dùng trong localStorage!");
            return;
        }
        if (roleId === '1') {
            setAdmin(user);
        } else {
            console.error("Bạn không phải là admin!");
            navigate('/home');
        }

    }, []);

    // Fetch
    useEffect(() => {
        const fetchPostByAdmin = async () => {
            try {
                const response = await axios.get("https://localhost:7158/api/post");
                const postList = response.data;

                const fetchAccountDTO = async (accountId) => {
                    try {
                        const response = await axios.get(`https://localhost:7158/api/Account/GetAccountById/${accountId}`);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching AccountDTO: ", error);
                        return null;
                    }
                };

                const updatedPostList = await Promise.all(
                    postList.map(async (post) => {
                        try {
                            const accountDTO = await fetchAccountDTO(post.accountId);
                            const accountUsername = accountDTO ? accountDTO.userName : "";
                            const updatedPost = { ...post, accountUsername };
                            const isNewState = editingState[post.postId] === undefined;
                            if (isNewState) {
                                setEditingState((prevState) => ({
                                    ...prevState,
                                    [post.postId]: updatedPost.isActive,
                                }));
                            } else {
                                updatedPost.isActive = editingState[post.postId];
                            }
                            return updatedPost;
                        } catch (error) {
                            console.error("Error fetching AccountDTO: ", error);
                            return post;
                        }
                    })
                );

                setPosts(updatedPostList);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };
        if (admin) {
            fetchPostByAdmin();
        }
    }, [admin]);

    //Collumn
    const columns = [
        {
            title: "Mã Bài Đăng",
            dataIndex: "postId",
            key: "postId",
        },
        {
            title: "Người Đăng",
            dataIndex: "accountUsername",
            key: "accountUsername",
        },
        {
            title: "Tiêu Đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Nội Dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Số Lượng Like",
            dataIndex: "likeCount",
            key: "likeCount",
        },
        {
            title: "Ngày Đăng Bài",
            dataIndex: "publishAt",
            key: "publishAt",
        },
        {
            title: "Thao tác",
            dataIndex: "name",
            render: (_, record) => (
                <div className="flex">
                    <button
                        type="primary"
                        onClick={() => {
                            setSelectedPostId(record.postId); // Changed from record.postId to post.postId
                            setIsModalDeleteOpen(true);
                        }}
                        className="bg-orange-400 w-[100px] py-1 rounded-xl "
                    >
                        Xóa
                    </button>

                    <ModalDeletePost
                        postId={selectedPostId}
                        onDelete={handleDelete}
                        isModalOpen={isModalDeleteOpen}
                        setIsModalOpen={setIsModalDeleteOpen}
                    />

                </div>
            ),

        },

    ];

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const showModalDelete = () => {
        setIsModalDeleteOpen(true);
    };

    //Thêm hàm togglePostStatus để chuyển đổi trạng thái bài đăng:
    const togglePostStatus = (post) => {
        const postId = post.postId;
        const updatedState = !editingState[postId];

        setEditingState((prevState) => ({
            ...prevState,
            [postId]: updatedState,
        }));

        // Gửi yêu cầu cập nhật trạng thái bài đăng đến backend tại đây
        // Sử dụng axios hoặc thư viện HTTP tương tự để gửi yêu cầu PUT/PATCH

        // Cập nhật trạng thái trong danh sách bài đăng hiển thị
        setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
                prevPost.postId === postId ? { ...prevPost, isActive: updatedState } : prevPost
            )
        );
    };

    const handleDelete = async (deletedPostId) => {
        try {
            await axios.delete(`https://localhost:7158/api/Post/${deletedPostId}`);
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== deletedPostId));
        } catch (error) {
            console.error("Error deleting course: ", error);
        } finally {
            setIsModalDeleteOpen(false);
            navigate('/admin/post', { replace: true }); // Điều hướng sau khi xóa
        }
    };

    //HTML
    return (
        <>
            <div className="w-full">
                <AdminHeader />
            </div>
            <div className="w-full flex">
                <div className="w-[20%] h-full">
                    <div className="home-page">
                        <AdminMenu />
                    </div>
                </div>
                {/* Body */}
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10 mr-5">
                        <Table
                            columns={columns}
                            dataSource={posts}
                        />
                    </div>
                </div>
                {/* End Body */}
            </div>
        </>
    );
}

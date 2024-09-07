import React, { useState } from 'react';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Form, Input } from 'antd';
interface PostProps {
    onClose: () => void; // Define the type of onClose function
}

function Post({ onClose }: PostProps) {
    const [postOpen, setPostOpen] = useState(false);
    const { TextArea } = Input;
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center" style={{ zIndex: 10 }}>
            <div className='mt-10 flex flex-col gap-5 text-black'>
                <div className='place-self-end'><Button icon={<CloseCircleOutlined />} onClick={onClose}></Button></div>

                <div className='bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h2 className='text-3xl font-extrabold'>Tạo bài viết</h2>
                    <Form
                        name="wrap"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 1000 }}
                    >
                        <Form.Item
                            name="Description"
                            rules={[{ required: true, message: 'Hãy nhập tiêu đề!' }]}
                        >
                            <Input placeholder="Thêm tiêu đề" />
                        </Form.Item>

                        <Form.Item
                            name="Content"
                            rules={[{ required: true, message: 'Hãy nhập nội dung!' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item label=" " className='flex flex-row justify-center items-center'>
                            <Upload {...props}>
                                <Button className='' icon={<UploadOutlined />}></Button>
                            </Upload>
                            <Button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 ml-4 mt-10" type="primary" htmlType="submit">
                                Đăng
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

    )

}
export default Post
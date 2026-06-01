





import axios from 'axios';
import React, { useEffect } from 'react'

export default function FileWala() {

    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [editingFileId, setEditingFileId] = React.useState(null);
    const [editingFileName, setEditingFileName] = React.useState('');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/file/list`);
            setFiles(response.data.data);
            console.log('Fetched files:', response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    const handleEdit = (fileData) => {
        setEditingFileId(fileData._id);
        setEditingFileName(fileData.imageName);
        setFile(null);
        setPreview(`${API_URL}/${fileData.signedUrl.replace(/\\/g, "/")}`);
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`${API_URL}/api/file/delete`, { id });
            setFiles((prev) => prev.filter((file) => file._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };


    const handleUpload = async () => {
        if (!file) {
            alert(editingFileId ? "Please select a new file to update." : "Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        let url = `${API_URL}/api/file/addfiles`;

        if (editingFileId) {
            formData.append('id', editingFileId);
            url = `${API_URL}/api/file/edit`;
        }

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(editingFileId ? "File updated successfully!" : "File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        } finally {
            setFile(null);
            setPreview('');
            setEditingFileId(null);
            setEditingFileName('');
            fetchData();
        }
    }


    return (
        <>
            <div className="flex flex-col gap-3">
                <input type="file" onChange={handleFileChange} className='border border-gray-500 p-2' />

                {editingFileId && (
                    <div className='text-sm text-blue-700 bg-blue-100 p-2 rounded'>
                        Editing file: <strong>{editingFileName}</strong>. Select a new image and click Update.
                    </div>
                )}

                {preview &&
                    <>
                        <div className='relative'>
                            <span

                                onClick={() => {
                                    setFile(null)
                                    setPreview('')
                                    setEditingFileId(null)
                                    setEditingFileName('')
                                }}
                                className='absolute top-1 right-1 text-white p-1  rounded-full w-6 h-6 font-semibold transition'>
                                <img src="/remove.png" alt="" />

                            </span>
                            {preview && <img src={preview} alt={`${file?.name || 'Preview'}`} className='max-w-60 max-h-full' />}
                        </div>
                        <button onClick={handleUpload} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition'>
                            {editingFileId ? 'Update' : 'Upload'}
                        </button>
                    </>
                }


             


                <div>
                    <h2 className='text-xl font-semibold mb-4'>
                        Uploaded Files:
                    </h2>

                    <ul className='space-y-3'>
                        {files.map((file) => (
                            <li
                                key={file._id}
                                className='flex items-center justify-between border p-3 rounded'
                            >
                                <div className='flex items-center gap-3'>
                                    <img
                                        src={file.signedUrl }
                                        alt={file.imageName}
                                        className='w-16 h-16 object-cover rounded'
                                    />

                                    <p>{file.imageName}</p>
                                </div>

                                <div className='flex gap-2'>
                                    <button
                                        className='bg-blue-500 text-white px-3 py-1 rounded'
                                        onClick={() => handleEdit(file)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className='bg-red-500 text-white px-3 py-1 rounded'
                                        onClick={() => handleDelete(file._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </>
    )

}
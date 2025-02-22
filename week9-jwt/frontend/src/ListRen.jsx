import { useState } from "react";
import axios from "axios";

const ListRed = ({ setToken }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const logoutClick = () => {
        setToken('')
    }

    const whoAmIClick = () => {
        axios.get('http://localhost:3000/users/verify', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                alert(res.data.role)

            }).catch((err) => { setToken('') })
    }

    const listUser = async () => {
        try {
            const res = await axios.get("http://localhost:3000/users/listby", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);

            setData(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
        }
    };

    return (
        <div>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex justify-between my-5'>
                <button className='btn bg-white text-black' onClick={() => { whoAmIClick() }}>who am i</button>
                <button className='btn bg-green-500' onClick={() => { listUser() }}>list of user</button>
                <button className='btn bg-red-500' onClick={() => logoutClick()}>logout</button>
            </div>

            {
                data.map(({ id, username, role }) => (
                    <div className='flex justify-between my-5 text-gray-400'>
                        <div className='w-[68px]'>{id}</div>
                        <div className='w-[68px]'>{role}</div>
                        <div className='w-[68px]'>{username}</div>
                    </div>
                ))
            }

        </div>
    );
};

export default ListRed;

import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AuthorDetailPage = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try{
                const response = await axios.get(`https://localhost:7207/api/Details/${id}`)
                setData(response.data);
            }
            catch(error){
                console.log("Помилка завантаження даних автора", error);
                alert("Помилка завантаження даних автора");
                navigate('/Library');
            }finally{
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, navigate])

    if (loading){
        return <div>Завантаження...</div>
    }

    if (!data){
        return <div>Автор не знайдений</div>
    }
    return(
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}>← Назад</button>
            
            <div style={styles.card}>
                <h2>Інформація про автора</h2>
                <p><strong>Ім'я:</strong> {data.author.firstName} {data.author.lastName}</p>
                <p><strong>Дата народження:</strong> {new Date(data.author.birthDate).toLocaleDateString()}</p>
            </div>

            <h3>Список книг автора ({data.books.length})</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={styles.th}>Назва</th>
                        <th style={styles.th}>ISBN</th>
                        <th style={styles.th}>Рік</th>
                        <th style={styles.th}>Ціна</th>
                    </tr>
                </thead>
                <tbody>
                    {data.books.map(book => (
                        <tr key={book.id}>
                            <td style={styles.td}>{book.title}</td>
                            <td style={styles.td}>{book.isbn}</td>
                            <td style={styles.td}>{book.publishYear}</td>
                            <td style={styles.td}>{book.price} грн</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
const styles = {
    backBtn: { marginBottom: '20px', cursor: 'pointer', padding: '5px 10px' },
    card: { padding: '15px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', background: '#f9f9f9' },
    th: { padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' },
    td: { padding: '10px', borderBottom: '1px solid #eee' }
};

export default AuthorDetailPage;
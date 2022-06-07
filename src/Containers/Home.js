import React, { useEffect } from 'react'
import { deleteDoc, getDocs, collection, doc } from 'firebase/firestore'
import { useState } from 'react'
import { auth, db } from '../Firebase/firebase-config';
import '../Styles/Home.css'

export default function Home(isAuth) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, 'Posts')




    const deletePost = async (id) => {
        const postDoc = doc(db, 'Posts', id)
        await deleteDoc(postDoc)
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, [deletePost]);
    return (
        <div className="homePage">
            {postLists.map((post) => {
                return <div className="post">
                    <div className="postHeader">
                        <div className="title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="deletePost">
                            {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}>
                                &#128465;
                            </button>
                            }
                        </div>
                    </div>
                    <div className="postTextContainer">
                        {post.postText}
                    </div>
                    <h3>@{post.author.name}</h3>
                </div>
            })}
        </div>
    )
}

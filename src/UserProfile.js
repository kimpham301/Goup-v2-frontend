import React, { useEffect, useState } from 'react'
import './userprofile.css'
import UserProfilePost from './UserProfilePost'

const UserProfile = () => {
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [posts, setPosts] = useState([])
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/my-profile', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setUsername(data.username)
            setBio(data.bio)
            setPosts(data.posts)
            console.log(data)
        })
        .catch(err => console.log("Error fetching user profile", err))
    }, [])   
    
    return (
        <div className='mt-6'>

            <div className={`modal ${openModal ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setOpenModal(false)}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-weight-bold has-text-info">Edit my profile</p>
                        <button className='button is-success is-small'>✓</button>
                    </header>
                    <section className="modal-card-body">
                        <form>
                            <p className='is-size-6 has-text-weight-semibold mb-3'>My username</p>
                            <input className='input is-info mb-3' type="text" placeholder={username || 'Unnamed'} />
                            <p className='is-size-6 has-text-weight-semibold mb-3'>My bio</p>
                            <input className='input is-info mb-3' type="text" placeholder={bio || 'No bio yet'} />
                        </form>
                    </section>
                </div>
            </div>

            <div id='user__profile__card' className="card mb-6">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <span className="tag is-rounded is-info is-large">
                                <p className='is-size-4 has-text-weight-bold is-capitalized'>{(username && username.charAt(0)) || 'G'}</p>
                            </span>
                        </div>
                        <div className="media-content">
                            <p className="is-size-4">@{username || 'Gouper'}</p>
                        </div>
                        <div className='media-right'>
                            <button className='button is-medium is-white' onClick={() => setOpenModal(true)}>
                                <span className="icon has-text-info" >
                                    <i className="fas fa-edit"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <p className='is-size-6'>{bio || 'I love football'}</p>
                    </div>
                </div>
            </div>

            <div id='user__profile__posts' className='container'>
                {posts && posts.map((post,index) => 
                    <UserProfilePost post={post} index={index} key={post.postId}/>
                )}
                

                
            </div>
        </div>
    )
}

export default UserProfile

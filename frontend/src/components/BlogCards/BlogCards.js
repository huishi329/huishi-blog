import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import styles from './BlogCards.module.css'

export function BlogCards () {
    const [blogs, setBlogs] = useState([])
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [show, setShow] = useState(false);
    const handleShow = (blogId) => {
        setShow(true)
        setSelectedBlog(blogId)
    }
    const handleClose = () => setShow(false);


    useEffect(() => {
            fetch('/wp-json/wp/v2/posts')
            .then(async (res) => {
                const data = await res.json();
                setBlogs(data)
            })
            .catch(err => console.log(err))
    }, [])

    if (!blogs.length) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <div className={styles.wrapper}>
                {blogs.map((blog, index) => (
                    <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="pots.jpg" />
                        <Card.Body>
                            <Card.Title>{blog.title.rendered}</Card.Title>

                            <Button variant="dark" onClick={() => handleShow(blog.id)}>See more</Button>
                        </Card.Body>
                        </Card>
                        {show && selectedBlog === blog.id &&
                              <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>{blog.title.rendered}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body><div dangerouslySetInnerHTML={{__html: blog.content.rendered}}></div></Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>}
                    </>
                ))}
            </div>

        </>
    )
}

export default BlogCards

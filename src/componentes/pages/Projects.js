import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Message from '../elements/Message'
import LinkButton from '../elements/LinkButton'
import Container from '../layout/Container'
import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'
import Loading from '../elements/Loading'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    const [erroAPI, setErroApi] = useState(false)
    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    function ErroApi(erro) {
        console.log(erro)
        setRemoveLoading(true)
        setErroApi(true)
    }

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
    }

    useEffect(() => {

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            }).catch((err) =>                
                ErroApi(err)            
            )

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}

                {!removeLoading && <Loading />}

                {removeLoading && projects.length === 0 && !erroAPI && (
                    <p>N??o h?? projetos cadastrados!</p>
                )}

                {erroAPI && projects.length === 0 && (
                    <p>N??o foi poss??vel recuperar os projetos. Tente novamente mais tarde. </p>                                           
                )}

            </Container>
        </div>
    )
}

export default Projects
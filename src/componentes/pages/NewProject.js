//import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProjectForm from './ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {

  // In react-router-dom v6 useHistory() is replaced by useNavigate().
  //const history = useHistory()
  const navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        //history.push('/projects', { message: 'Projeto criado com sucesso!' })
        navigate('/projects', {state: {message: 'Uhuu! O projeto foi criado e você já pode começar a trabalhar nele.'}})
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject
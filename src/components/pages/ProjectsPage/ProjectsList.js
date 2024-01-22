import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';





let category = null;


function ProjectsList({ categoryUrl }) {

    // Datos hardcode de prueba
    const [projectsData, setProjectsData] = useState([
        {
            id: 1,
            title: "Beneficio a favor de Maria Laura Rosales",
            description: "Maria Laura tiene una enfermedad y necesita dinero para poder vivir un día más, ayudanos.",
            process: "50%",
            donated: "2000 Bs.",
            goal: "4000 Bs.",
            categoryId: 0,
        },
        {
            id: 2,
            title: "Ayuda a la comunidad Sagrada Familia",
            description: "La comunidad está pasando por un momento de necesidad en el cuál se les imposibilita el acceso a agua limpia y necesitamos tu valiosa ayuda.",
            process: "72.5%",
            donated: "1450 Bs.",
            goal: "2000 Bs.",
            categoryId: 1,
        },
        {
            id: 3,
            title: "Actividad en favor de los niños de bajo recursos",
            description: "Ayudanos a ofrecerles un momento de felicidad a estos niños que día a día sufren de la precariedad y el abandono, para poder dar un paso más en poner una pequeña sonrisa en sus rostros.",
            process: "60%",
            donated: "3000 Bs.",
            goal: "5000 Bs.",
            categoryId: 2,
        },
    ]);

    let categories = [
        {
            id: 0,
            name: "Categoría 1",
            url: "categoria-1",
        },
        {
            id: 1,
            name: "Categoría 2",
            url: "categoria-2",
        },
        {
            id: 2,
            name: "Categoría 3",
            url: "categoria-3",
        }
    ]


    const [projects, setProjects] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (categoryUrl) {
            setCategory(categories.find(item => item.url === categoryUrl));
        } else {
            setCategory(null);
        }
    }, [categoryUrl]);

    useEffect(() => {
        if (category) {
            setProjects(projectsData.filter(project => project.categoryId === category.id));
        } else {
            setProjects(projectsData);
        }
    }, [category]);


    return (
        <Container>
            <TextSmall className='mt-5'>
                <span>
                    {category === null ? 'Todos los proyectos' : category.name}
                </span>
            </TextSmall>

            <h2>¡Encuentra Tu Proyecto Favorito <br /> Y Apóyalo!</h2>

            <Row xs={2} md={4} className="g-4 mt-5">
                {
                    projects.map((project) => {
                        return (
                            <Col>
                                <ProjectCard project={project} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
}


const TextSmall = styled.p`
    // Muestra la linea de al lado del texto
    span {
        font-family: Montserrat;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        position: relative;
        overflow: hidden;
    }

    span:after {
        display: inline-block;
        content: "";
        height: 1px;
        background: #00000040;
        position: absolute;
        width: 25%;
        top: 50%;
        margin-top: 1px;
        margin-left: 10px;
    }
`

export default ProjectsList;

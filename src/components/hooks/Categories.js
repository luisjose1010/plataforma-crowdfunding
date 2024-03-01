import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api';

function Categories() {
  const [categories, setCategories] = useState([]);

  function fetchCategory() {
    api.get('/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {

      });
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <h3>Category</h3>

      <hr />

      <ListGroup variant="flush">
        {
                    categories.map((category) => (
                      <ListGroup.Item as={Link} to={`/proyectos-sociales/categorias/${category.url}`} className="d-flex justify-content-between">
                        <span>{category.name}</span>
                        <span className="float-right">
                          (
                          {category.projects_count}
                          )
                        </span>
                      </ListGroup.Item>
                    ))
                }
      </ListGroup>
    </>
  );
}

export default Categories;

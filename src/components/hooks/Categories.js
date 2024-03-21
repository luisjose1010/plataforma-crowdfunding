import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';

function Categories({ active }) {
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
            <ListGroup.Item
              key={category.id}
              as={Link}
              to={`/proyectos-sociales/categorias/${category.url}`}
              className="d-flex justify-content-between"
            >
              <span className={`${category.id === active ? 'fw-bold' : ''}`}>{category.name}</span>
              <span className={`float-right ${category.id === active ? 'fw-bold' : ''}`}>
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

Categories.propTypes = {
  active: PropTypes.number.isRequired,
};

export default Categories;

import { useState, useEffect } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
import { CategoriesLoader } from './Loaders';

function Categories({ active }) {
  const [categories, setCategories] = useState(null);

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
          categories ? (
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
          ) : (
            <Row>
              <CategoriesLoader />
            </Row>
          )
        }
      </ListGroup>
    </>
  );
}

Categories.propTypes = {
  active: PropTypes.number.isRequired,
};

export default Categories;

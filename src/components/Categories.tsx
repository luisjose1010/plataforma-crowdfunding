import api from '@/api';
import { CategoriesLoader } from '@/components/ui/loaders';
import { Category } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  active: string;
}

function Categories({ active }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[] | null>(null);

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

export default Categories;

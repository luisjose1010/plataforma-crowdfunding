import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Datos hardcode de prueba
const categories = [
  {
    id: 0,
    name: 'Categoría 1',
    url: 'categoria-1',
    total: 1,
  },
  {
    id: 1,
    name: 'Categoría 2',
    url: 'categoria-2',
    total: 1,
  },
  {
    id: 2,
    name: 'Categoría 3',
    url: 'categoria-3',
    total: 1,
  },
];

function Categories() {
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
                          {category.total}
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

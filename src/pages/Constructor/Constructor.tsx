import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import styles from './Constructor.module.css';

const ConstructorPage = () =>
{
    return (
        <main className={styles.page}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}

export default ConstructorPage;


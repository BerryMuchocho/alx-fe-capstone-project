import CategorySelect from '../components/CategorySelect';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

const categories = [
    { id: '9', name: 'General Knowledge' },
    { id: '21', name: 'Sports' },
    { id: '23', name: 'History' },
    { id: '17', name: 'Science & Nature' },
    { id: '22', name: 'Geography' },
];

function Home({selectedCategory, setSelectedCategory}) {
    const navigate = useNavigate();

    const handleChange = (category) => {
        setSelectedCategory(category);
    };

    const startQuiz = () => {
        if (!selectedCategory) {
            alert("Please select a category to start the quiz.");
            return;
        }
        navigate("/quiz");
    };
    
    return (
        <Layout>
        <div className="max-w-md mx-auto mt-20 text-center space-y-6">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-600">BrainBurst</h1>
            <p className="text-lg mb-6 text-gray-500">Beat the Clock, have fun!</p>

            <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={handleChange}
            />
            <Button onClick={startQuiz}>
                Start Quiz
            </Button>
        </div>
        </Layout>
        
    );
}

export default Home;

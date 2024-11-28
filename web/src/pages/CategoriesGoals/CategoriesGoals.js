import {React, useState, useEffect}  from "react";
import "./CategoriesGoals.css";
import Loader from "react-spinners/PuffLoader";
import RangeSlider from 'react-bootstrap-range-slider';
import { getCategories, saveCategoriesGoals } from '../../callouts/server';

const CategoriesGoals = () => {

    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoaded(true);
            const result = await getCategories();
            if(!result){
                console.error("result is empty");
                return;
            }
            console.log('getCategories ', result);
            setCategories(result.data);
            
        } catch (error) {
            console.error(error);
        }
        finally{
            setIsLoaded(false);
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoaded(true);
            const result = await saveCategoriesGoals(categories);
            if(!result){
                console.error("result is empty");
                return;
            }
        } catch (error) {
            console.error(error);
        }
        finally{
            setIsLoaded(false);
        }
    }

    const handleRangeChange = (index, value) => {
      const updatedCategories = [...categories];
      updatedCategories[index].goal = parseFloat(value); // Update the actual value
      setCategories(updatedCategories);
    };

    return (
       <div className="container">
            <h1>Set Goals</h1>
            {!isLoaded && (
            <>
                <form onSubmit={handleSubmit}>

                    {categories.map((category, index) => (
                        <div key={index} className="wrapper-cls">
                            <label htmlFor={`progress-${index}`} className="label-cls">{category.name}:</label>
                            0
                            <RangeSlider
                                value={category.goal}
                                min={0}
                                max={10000}
                                onChange={changeEvent => handleRangeChange(index, changeEvent.target.value)}
                            />
                            10000
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Save</button>
                    <div className="loading">
                        <Loader 
                            size="25"
                            color="#344feb"
                            loading={isLoaded}
                            speedMultiplier="0.5"/>
                    </div>
                </form>
            </>
        )}
       </div> 
    )
}

export default CategoriesGoals;

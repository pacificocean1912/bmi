


window.onload = () => {
    let button = document.querySelector("#btn");
    
    // Function for calculating BMI
    button.addEventListener("click", calculateBMI);
    };
 
/**
 * Calculates the Body Mass Index (BMI) based on the given height and weight.
 * Displays the result on the webpage.
 */
function calculateBMI() {
  console.log("calculateBMI function called");
  try {
    // Get the input elements for height and weight
    const heightInput = document.querySelector("#height");
    const weightInput = document.querySelector("#weight");
    console.log("Input elements for height and weight:", heightInput, weightInput);

    // Get the element to display the result
    const resultElement = document.querySelector("#result");
    console.log("Result element:", resultElement);

    // Parse the input values as integers
    const height = parseInt(heightInput.value);
    const weight = parseInt(weightInput.value);
    console.log("Parsed input values for height and weight:", height, weight);

    // Check if the input values are valid numbers and not empty
    if (isNaN(height) || isNaN(weight) || height === "") {
      console.log("Invalid input values for height and weight");
      // Display an error message if the input is invalid
      resultElement.innerHTML = "Please provide valid height and weight.";
      return;
    }

    // Calculate the BMI using the formula
    const bmi = (weight / ((height) ** 2)).toFixed(2);
    console.log("BMI calculated:", bmi);

    // Get the category of the BMI using the helper function
    const bmiCategory = getBMICategory(bmi);
    console.log("BMI category:", bmiCategory);

    // Display the BMI and category on the webpage
    resultElement.innerHTML = `${bmiCategory} : <span>${bmi}</span>`;
    console.log("Result displayed on the webpage");
  } catch (error) {
    console.error("An error occurred:", error);
    // Display an error message if an exception occurs
    resultElement.innerHTML = "An error occurred. Please try again later.";
  }
}

async function getBMICategory(bmi) {
    if (bmi === null || bmi === undefined) {
        throw new Error('BMI cannot be null or undefined');
    }

    try {
         
        const user = new User({
            height,
            weight,
            bmi,
            date: new Date()
        });
        await user.save();
        console.log('User data saved to MongoDB');
    } catch (error) {
        console.error('Error saving user data:', error);
        // Handle error appropriately
        throw error;
    }

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal";
    } else {
        return "Overweight";
    }
}


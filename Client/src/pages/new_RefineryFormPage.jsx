import New_Alpha_Form from "../components/InputForm/Refinery/new_Alpha_Form";
import New_DeGum_Bleach_Form from "../components/InputForm/Refinery/new_DeGum_Bleach_Form";
import New_DeWaxing_Form from "../components/InputForm/Refinery/new_DeWaxing_Form";
import New_DEO_Form from "../components/InputForm/Refinery/new_DEO_Form";

const NewRefineryFormPage = () => {
    return(
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen" style={{ backgroundColor: '#FBF0AF' }} >
        <New_DeGum_Bleach_Form/>
        <New_Alpha_Form />
        <New_DeWaxing_Form />
        <New_DEO_Form />
    </div>
       
    
    );
}

export default NewRefineryFormPage
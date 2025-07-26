import DeGumming_Bleaching_Form from '../components/InputForm/Refinery/DeGumming_Bleaching_Form';
import New_DeGum_Bleach_Form from '../components/InputForm/Refinery/new_DeGum_Bleach_Form';
import New_Alpha_Form from '../components/InputForm/Refinery/new_Alpha_Form';
import AlphaForm from '../components/InputForm/Refinery/AlphaForm';
import DeWaxingForm from '../components/InputForm/Refinery/DeWaxingForm';
import New_DeWaxing_Form from '../components/InputForm/Refinery/new_DeWaxing_Form';
import DEOForm from '../components/InputForm/Refinery/DEOForm';
import New_DEO_Form from '../components/InputForm/Refinery/new_DEO_Form';

const RefineryFormPage = () => {

    return(
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen" style={{ backgroundColor: '#FBF0AF' }}>
        <New_DeGum_Bleach_Form/>
        <New_Alpha_Form/>
        <New_DeWaxing_Form/>
        <New_DEO_Form/>
    </div>
    );
}

export default RefineryFormPage;
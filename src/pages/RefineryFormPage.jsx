import DeGumming_Bleaching_Form from '../components/InputForm/Refinery/DeGumming_Bleaching_Form';
import AlphaForm from '../components/InputForm/Refinery/AlphaForm';
import DeWaxingForm from '../components/InputForm/Refinery/DeWaxingForm'
import DEOForm from '../components/InputForm/Refinery/DEOForm';

const RefineryFormPage = () => {

    return(
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen" style={{ backgroundColor: '#FBF0AF' }}>
        <DeGumming_Bleaching_Form/>
        <AlphaForm/>
        <DeWaxingForm/>
        <DEOForm />

    </div>
    );
}

export default RefineryFormPage;
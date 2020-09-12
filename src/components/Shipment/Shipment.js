import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        console.log('Form submitted',data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue={loggedInUser.name} ref={register} />
            <input name="example" defaultValue={loggedInUser.email} ref={register} />
            <input name="address" ref={register({ required: true })} placeholder="Your address"/>
            {errors.address && <span className="error">Address is required</span>}
            <input name="phoneNumber" ref={register({ required: true })} placeholder="Your phone number"/>
            {errors.phoneNumber && <span className="error">Phone Number is required</span>}
            
            <input type="submit" />
        </form>
    );
}

export default Shipment;
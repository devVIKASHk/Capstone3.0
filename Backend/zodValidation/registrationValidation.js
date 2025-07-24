import {z} from 'zod';


//*Login validation


export const loginValidation = z.object(
    {
        email:z.coerce
                .string()
                .nonempty({message:'Please enter your email!'})
                .email({message:'Enter a valid email!'})
                .max(150,{message:'Email must not exceed 150 length!'})
                .trim(),


        password:z.coerce
                .string()
                .nonempty({message:'Please enter your password!'})
                .min(8,{message:'Password must be at least 8 long!'})
                .max(100,{message:'Password length must not exceed 100 character!'})
                .trim(),
                
            
    }
)


//* Registration Validation

export const registrationValidation = z.object(
    {
        name:z.coerce   
                .string()
                .nonempty({message:'Please enter your Username!'})
                .min(3,{message:'Username must be at least 3 character!'})
                .max(50,{message:'Username is too long must not exceed 50 character!'})
                .trim(),

        ...loginValidation.shape
                
    }
)
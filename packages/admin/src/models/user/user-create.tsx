import { Create, required, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { AuthRole } from '../role.type';

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="email" required fullWidth />
            <TextInput source="username" required fullWidth />
            <TextInput source="password" fullWidth  />
            <SelectInput 
              validate={[required()]} 
              fullWidth
              source='role' 
              choices={Object.keys(AuthRole).map((key) => ({ id: key, name: AuthRole[key as keyof typeof AuthRole] }))} 
            />
        </SimpleForm>
    </Create>
);
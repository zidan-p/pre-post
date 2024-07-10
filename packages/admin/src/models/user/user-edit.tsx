import { Edit, required, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { AuthRole } from '../role.type';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="email" required fullWidth />
            <TextInput source="username" required fullWidth />
            <TextInput source="passowrd" fullWidth  />
            <SelectInput 
              validate={[required()]} 
              fullWidth
              source='role' 
              choices={Object.keys(AuthRole).map((key) => ({ id: key, name: AuthRole[key as keyof typeof AuthRole] }))} 
            />
        </SimpleForm>
    </Edit>
);
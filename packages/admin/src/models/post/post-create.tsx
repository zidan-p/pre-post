import { BooleanInput, Create, ReferenceInput, SimpleForm, TextInput, FileInput, useGetIdentity, required, SelectInput } from 'react-admin';
import { Role } from '../role.type';


export const PostCreate = () => {
  const { data: identity} = useGetIdentity();

  console.log(identity);

  return (
    <Create mutationOptions={{meta: {isFormData: true}}}>
      <SimpleForm>
        <TextInput source="title" sx={{width: "100%"}} validate={[required()]} />
        <TextInput source="content" sx={{width: "100%"}} validate={[required()]} />
        <FileInput source='postImage' sx={{width: "100%"}} />
        <ReferenceInput source="ownerId" fullWidth  reference={'users'}>
          <SelectInput 
            defaultValue={identity?.id} 
            validate={[required()]} 
            // only let user with admin previllige change owner
            disabled={identity?.role === Role.ADMIN ? false : true}  
            optionText="id" 
            fullWidth 
          />
        </ReferenceInput>
        <BooleanInput source="isPublished" fullWidth />
      </SimpleForm>
    </Create>
);}
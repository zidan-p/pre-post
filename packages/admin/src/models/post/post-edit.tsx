import { BooleanInput, DateInput, Edit, FileField, FileInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin';
// import { ReactAdminImageWithAuth } from '../../widgets/react-admin-image-with-auth';
import { Box, } from '@mui/material';

export const PostEdit = () => {
  // const [update, { isPending }] = useUpdate();


   
  return (
    <Edit mutationOptions={{meta: {isFormData: true}}}>
      <SimpleForm>
        <TextInput source="id" sx={{width: "100%"}} disabled />
        <TextInput source="title" sx={{width: "100%"}} />
        <TextInput multiline source="content" sx={{width: "100%"}} />
        {/* <ReactAdminImageWithAuth source='image' style={{maxWidth: "500px", width: "100%", marginBottom: "20px"}} /> */}
        <FileInput source="postImage">
          <FileField source="src" title="title" />
        </FileInput>
        <Box display="flex" sx={{width: "100%"}}>
          <Box flex={1} mr="0.5em">
            <ReferenceInput source="ownerId" reference="users" fullWidth />
          </Box>
          <Box flex={1} ml="0.5em">
            <BooleanInput source="isPublished" fullWidth />
          </Box>
        </Box>
        <DateInput source="dateTimeCreated" sx={{width: "100%"}} disabled />
      </SimpleForm>
    </Edit>
  );
}
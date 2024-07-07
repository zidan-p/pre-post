import { BooleanInput, DateInput, Create, ReferenceInput, SimpleForm, TextInput, FileInput } from 'react-admin';

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" sx={{width: "100%"}} />
            <TextInput source="title" sx={{width: "100%"}} />
            <TextInput source="content" sx={{width: "100%"}} />
            {/* <TextInput source="image" sx={{width: "100%"}} /> */}
            <FileInput source='postImage' sx={{width: "100%"}} />
            <ReferenceInput source="ownerId" reference="users" sx={{width: "100%"}} />
            <BooleanInput source="isPublished" sx={{width: "100%"}} />
            <DateInput source="dateTimeCreated" sx={{width: "100%"}} />
        </SimpleForm>
    </Create>
);
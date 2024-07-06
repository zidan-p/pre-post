import { BooleanInput, DateInput, Edit, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="content" />
            <TextInput source="image" />
            <ReferenceInput source="ownerId" reference="users" />
            <BooleanInput source="isPublished" />
            <DateInput source="dateTimeCreated" />
        </SimpleForm>
    </Edit>
);
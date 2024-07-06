import { BooleanField, Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="content" />
            <TextField source="image" />
            <ReferenceField source="ownerId" reference="users" />
            <BooleanField source="isPublished" />
            <DateField source="dateTimeCreated" />
        </Datagrid>
    </List>
);
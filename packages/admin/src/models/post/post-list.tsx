import { BooleanField, Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';
import { ReactAdminImageWithAuth } from '../../widgets/react-admin-image-with-auth';
import { ReactAdminLimitedTextField } from '../../widgets/react-admin-limited-text-field';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReactAdminImageWithAuth source='image' />
            <TextField source="id" />
            <TextField source="title" />
            <ReactAdminLimitedTextField source='content' />
            <ReferenceField source="ownerId" reference="users" />
            <BooleanField source="isPublished" />
            <DateField source="dateTimeCreated" />
        </Datagrid>
    </List>
);
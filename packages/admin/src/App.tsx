import { Admin, EditGuesser, Resource} from 'react-admin';
import { prepostDataProvider } from './services/prepost-dataprovider';
import { prepostAuthProvider } from './services/auth-provider';
import { PostList } from './models/post/post-list';
import { UserList } from './models/user/user-list';
import { PostEdit } from './models/post/post-edit';
import { PostCreate } from './models/post/post-create';


const prepostURL = import.meta.env.VITE_PREPOST_URL;
const mainDataProvider = prepostDataProvider(prepostURL);
const authProvider = new prepostAuthProvider(prepostURL);

export const App = () => (
    <Admin dataProvider={mainDataProvider} authProvider={authProvider}>
        <Resource name='posts' list={PostList} edit={PostEdit} create={PostCreate} /> 
        <Resource name='users' list={UserList} edit={EditGuesser} />  
    </Admin> 
);

    
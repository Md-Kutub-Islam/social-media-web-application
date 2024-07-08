import state from "../../state";
import FriendListPage from "./FriendListPage";
import { useSelector } from "react-redux";

function FriendRoute(){
    const {_id} = useSelector(state => state.user)
    return <FriendListPage userId={_id} />
}

export default FriendRoute
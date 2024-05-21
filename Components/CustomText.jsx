import {Text} from 'react-native'

function CustomText(props) {
    return (
        <>
            <Text style={{fontsize: 20}}>{props.title}</Text>

        </>
    );
}
export default CustomText;
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const errorAlert = (message = "something wrong!") => {
    
    MySwal.fire({
        title: "Error!",
        text: message,
        icon: "error"
    });
}
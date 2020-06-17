import axios from 'axios';

const uri = 'http://api.quotable.io/random';

const getData = () => axios.get(uri).then((response) => response.data.content.split(' '));
export default getData;

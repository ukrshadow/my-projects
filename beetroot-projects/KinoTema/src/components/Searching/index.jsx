import { Autocomplete, Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import routes from '../../routing/routes';
import { useDebounce } from '../../hooks/useDebounce';
import { OPTIONS } from '../../pages/fetchOptions';

const Searching = () => {
    const [filmTitle, setFilmTitle] = useState([]);
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value, 900);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/search/multi?query=" + debounceValue + "&include_adult=false&language=en-US", OPTIONS)
            .then(response => response.json())
            .then(data => {
                const updatedFilmTitle = data.results.map((result) => {
                    return { title: result.title, id: result.id }
                });
                setFilmTitle(updatedFilmTitle)
            });
    }, [debounceValue])

    return (
        <Autocomplete
            id="combo-box-demo"
            options={filmTitle}
            getOptionLabel={(option) => (option.title) || ''}
            style={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
                option.title === value.title
            }
            renderOption={(props, title) => (
                <Box component="li" {...props} key={Math.random()} onClick={() => { setValue('') }}>
                    <Link to={routes.films + '/' + title.id}  >
                        {title.title}
                    </Link>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(newValue) => {
                        setValue(newValue.target.value);
                    }}
                    value={value}
                    label="Search movie/serial"
                    className="h-auto w-auto bg-gray-200 rounded-lg outline-0 px-5"
                />
            )}
        />

    )

}

export default Searching

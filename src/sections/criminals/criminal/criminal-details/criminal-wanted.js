import { Button, Unstable_Grid2 as Grid, Divider, Typography } from '@mui/material';
import CriminalWantedItem from "./criminal-wanted-item";

const CriminalWanted = ({ state, dispatch, loading, handleChange, handleDateChange }) => {
    return (
        <div>
            {state.criminal.wantedCriminals && state.criminal.wantedCriminals.map(
                (wanted, index) => (
                    <CriminalWantedItem
                        key={index}
                        title={index + 1}
                        state={state}
                        wanted={wanted}
                        dispatch={dispatch}
                        index={index}
                        loading={loading}
                        handleChange={(event) => handleChange(event, index)}
                        handleDateChange={handleDateChange}
                    />
                )
            )}
        </div>
    )
};

export default CriminalWanted;
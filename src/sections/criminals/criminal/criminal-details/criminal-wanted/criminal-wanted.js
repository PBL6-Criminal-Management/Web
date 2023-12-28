import { Button, Unstable_Grid2 as Grid, Divider, Typography, Card, CardContent } from '@mui/material';
import CriminalWantedItem from "./criminal-wanted-item";
import { Space } from 'antd';

const CriminalWanted = (props) => {
    const { state, dispatch, loading, handleChange, handleDateChange } = props;

    return (
        <Card
            sx={{
                p: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                border: 'none'
            }}
        >
            <CardContent>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
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
                </Space>
            </CardContent>
        </Card>
    )
};

export default CriminalWanted;
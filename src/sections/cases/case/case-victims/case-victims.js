import { Button, Unstable_Grid2 as Grid, Divider, Typography, Card, CardContent } from '@mui/material';
import CaseVictimItem from "./case-victim-item";
import { Space } from 'antd';
const CaseVictims = (props) => {
    const { state, loading, handleChangeVictims, handleDateChangeVictims, handleDateTimeChangeVictims, handleSubmit, handleEdit, handleCancel, handleDeleteVictim } = props;

    return (
        <Card
            sx={{
                p: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
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
                    {state.casee.victims && state.casee.victims.map(
                        (victim, index) => (
                            <CaseVictimItem
                                key={index}
                                state={state}
                                victim={victim}
                                index={index}
                                loading={loading}
                                handleChangeVictims={handleChangeVictims}
                                handleDateChangeVictims={handleDateChangeVictims}
                                handleDateTimeChangeVictims={handleDateTimeChangeVictims}
                                handleSubmit={handleSubmit}
                                handleEdit={handleEdit}
                                handleCancel={handleCancel}
                                handleDeleteVictim={handleDeleteVictim}
                            />
                        )
                    )}
                </Space>
            </CardContent>
        </Card>
    )
};

export default CaseVictims;
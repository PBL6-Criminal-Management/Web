import { Button, Unstable_Grid2 as Grid, Divider, Typography, Card, CardContent } from '@mui/material';
import CaseWitnessItem from "./case-witness-item";
import { Space } from 'antd';
const CaseWitnesses = (props) => {
    const { state, loading, handleChangeWitnesses, handleDateChangeWitnesses, handleDateTimeChangeWitnesses, handleSubmit, handleEdit, handleCancel, handleDeleteWitness } = props;

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
                    {state.casee.witnesses && state.casee.witnesses.map(
                        (witness, index) => (
                            <CaseWitnessItem
                                key={index}
                                state={state}
                                witness={witness}
                                index={index}
                                loading={loading}
                                handleChangeWitnesses={handleChangeWitnesses}
                                handleDateChangeWitnesses={handleDateChangeWitnesses}
                                handleDateTimeChangeWitnesses={handleDateTimeChangeWitnesses}
                                handleSubmit={handleSubmit}
                                handleEdit={handleEdit}
                                handleCancel={handleCancel}
                                handleDeleteWitness={handleDeleteWitness}
                            />
                        )
                    )}
                </Space>
            </CardContent>
        </Card>
    )
};

export default CaseWitnesses;
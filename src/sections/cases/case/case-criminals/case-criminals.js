import { Card, CardContent } from '@mui/material';
import CaseCriminalItem from "./case-criminal-item";
import { Space } from 'antd';
const CaseCriminals = (props) => {
    const { state, criminals, loading, handleChangeCriminals, handleDateTimeChangeCriminals, handleSubmit, handleEdit, handleCancel, handleDeleteCriminal } = props;

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
                    {state.casee.criminals && state.casee.criminals.map(
                        (criminal, index) => {
                            return (
                                <CaseCriminalItem
                                    key={index}
                                    state={state}
                                    criminal={criminal}
                                    criminals={criminals}
                                    index={index}
                                    loading={loading}
                                    handleChangeCriminals={handleChangeCriminals}
                                    handleDateTimeChangeCriminals={handleDateTimeChangeCriminals}
                                    handleSubmit={handleSubmit}
                                    handleEdit={handleEdit}
                                    handleCancel={handleCancel}
                                    handleDeleteCriminal={handleDeleteCriminal}
                                />
                            )
                        }
                    )}
                </Space>
            </CardContent>
        </Card>
    )
};

export default CaseCriminals;
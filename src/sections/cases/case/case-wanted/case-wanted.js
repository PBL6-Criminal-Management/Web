import { Card, CardContent } from '@mui/material';
import CaseWantedItem from './case-watend-item';
import { Space } from 'antd';
const CaseWanted = (props) => {
    const { state, criminals, loading, handleChangeWanted, handleDateChangeWanted, handleSubmit, handleEdit, handleCancel, handleDeleteWanted } = props;

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
                    {state.casee.wantedCriminalRequest && state.casee.wantedCriminalRequest.map(
                        (wanted, index) => {
                            return (
                                <CaseWantedItem
                                    key={index}
                                    state={state}
                                    wanted={wanted}
                                    criminals={criminals}
                                    index={index}
                                    loading={loading}
                                    handleChangeWanted={handleChangeWanted}
                                    handleDateChangeWanted={handleDateChangeWanted}
                                    handleSubmit={handleSubmit}
                                    handleEdit={handleEdit}
                                    handleCancel={handleCancel}
                                    handleDeleteWanted={handleDeleteWanted}
                                />
                            )
                        }
                    )}
                </Space>
            </CardContent>
        </Card>
    )
};

export default CaseWanted;
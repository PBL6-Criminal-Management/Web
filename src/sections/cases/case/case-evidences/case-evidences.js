import { Button, Unstable_Grid2 as Grid, Divider, Typography, Card, CardContent } from '@mui/material';
import CaseEvidenceItem from "./case-evidence-item";
import { Space } from 'antd';
const CaseEvidences = (props) => {
    const { state, loading, handleChangeEvidences, handleSubmit, handleEdit, handleCancel, handleDeleteEvidence, handleAddImageEvidence, handleDeleteImageEvidence } = props;
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
                    {state.casee.evidences && state.casee.evidences.map(
                        (evidence, index) => (
                            <CaseEvidenceItem
                                key={index}
                                state={state}
                                evidence={evidence}
                                index={index}
                                loading={loading}
                                handleChangeEvidences={handleChangeEvidences}
                                handleSubmit={handleSubmit}
                                handleEdit={handleEdit}
                                handleCancel={handleCancel}
                                handleDeleteEvidence={handleDeleteEvidence}
                                handleAddImageEvidence={handleAddImageEvidence}
                                handleDeleteImageEvidence={handleDeleteImageEvidence}
                            />
                        )
                    )}
                </Space>
            </CardContent>
        </Card>
    )
};

export default CaseEvidences;
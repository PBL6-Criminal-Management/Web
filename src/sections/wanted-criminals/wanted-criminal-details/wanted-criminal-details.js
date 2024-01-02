import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { Avatar, Descriptions } from "antd";
import * as constants from "../../../constants/constants";
import { useState } from "react"; 

const WantedCriminalDetails = (props) => {
    const { wantedCriminal } = props;
    const [lastIndex, setLastIndex] = useState(wantedCriminal.wantedCriminals?.length - 1);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <Grid p={0} pr={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    shape="square"
                    size={256}
                    src={wantedCriminal.avatarLink}
                />
                <Typography sx={{ color: "#1C2536" }} mt={0.5} variant="h6">
                    {wantedCriminal.name}
                </Typography>
                <Typography
                    sx={{
                        color: "#1C2536",
                        fontStyle: "italic",
                    }}
                >
                    ({wantedCriminal.charge})
                </Typography>
            </Grid>
            <Grid p={0}>
                <Grid p={0}>
                    <Descriptions
                        title="Thông tin chung"
                        bordered
                        size="small"
                        labelStyle={{
                            backgroundColor: '#F2F4F7',
                        }}
                        contentStyle={{
                            color: '#1C2536'
                        }}
                    >
                        {[
                            { label: "Họ và tên", name: "name", span: 2 },
                            { label: "Tên khác", name: "anotherName", span: 1 },
                            { label: "Ngày sinh", name: "birthday" },
                            {
                                label: "Giới tính",
                                name: "gender",
                                selectProps: constants.gender,
                            },
                            { label: "CMND/CCCD", name: "citizenId" },
                            { label: "Số điện thoại", name: "phoneNumber" },
                            { label: "Quê quán", name: "homeTown" },
                            { label: "Quốc tịch", name: "nationality" },
                            { label: "Dân tộc", name: "ethnicity", span: 1.5 },
                            { label: "Tôn giáo", name: "religion", span: 1.5 },
                            { label: "Nơi ĐKTT", name: "permanentResidence", span: 1.5 },
                            { label: "Nơi ở hiện tại", name: "currentAccommodation", span: 1.5 },
                            { label: "Nghề nghiệp, nơi làm việc", span: 3 },
                            { label: "Họ và tên cha", name: "fatherName" },
                            { label: "Ngày sinh cha", name: "fatherBirthday" },
                            { label: "CMND/CCCD cha", name: "fatherCitizenId" },
                            { label: "Họ và tên mẹ", name: "motherName" },
                            { label: "Ngày sinh mẹ", name: "motherBirthday" },
                            { label: "CMND/CCCD mẹ", name: "motherCitizenId" },
                            {
                                label: "Đặc điểm nhận dạng",
                                name: "characteristics"
                            },
                        ].map((field) => (
                            <Descriptions.Item label={field.label} span={field.span}>{field.selectProps ? field.selectProps[wantedCriminal[field.name]] : wantedCriminal[field.name]}</Descriptions.Item>
                        ))}
                    </Descriptions>
                </Grid>
                <Grid p={0} mt={1}>
                    <Descriptions
                        title="Thông tin truy nã"
                        bordered
                        size="small"
                        labelStyle={{
                            backgroundColor: '#F2F4F7',
                            width: "160px"
                        }}
                        contentStyle={{
                            color: '#1C2536'
                        }}
                    >
                        {[
                            { label: "Tội danh", name: "charge", span: 3 },
                            { label: "Vũ khí", name: "weapon", span: 3 },
                            { label: "Loại truy nã", name: "wantedType", selectProps: constants.wantedType, span: 3 },
                            { label: "Số ra quyết định", name: "wantedDecisionNo", span: 3 },
                            { label: "Ngày ra quyết định", name: "wantedDecisionDay", span: 3 },
                            { label: "Đơn vị ra quyết định", name: "decisionMakingUnit", span: 3 },
                        ].map((field) => (
                            <Descriptions.Item label={field.label} span={field.span} key={field.name}>
                                {wantedCriminal && wantedCriminal.wantedCriminals && wantedCriminal.wantedCriminals.length
                                    ? (field.selectProps
                                        ? field.selectProps[wantedCriminal.wantedCriminals[lastIndex][field.name]]
                                        : wantedCriminal.wantedCriminals[lastIndex][field.name])
                                    : 'N/A'}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </Grid>
            </Grid>
        </div>
    );
};

export default WantedCriminalDetails;
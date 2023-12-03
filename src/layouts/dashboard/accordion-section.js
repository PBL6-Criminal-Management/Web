import { Accordion, AccordionDetails, AccordionSummary, Typography, Button} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const AccordionSection = ({ summary, summaryVariant, children }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={
                    <ArrowForwardIosSharpIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'primary.main',
                        }}
                    />}
            >
                <Typography
                    variant={summaryVariant || 'h5'}
                    sx={{
                        color: 'primary.main',
                        ml: 1.5,
                    }}
                >
                    {summary}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionSection;
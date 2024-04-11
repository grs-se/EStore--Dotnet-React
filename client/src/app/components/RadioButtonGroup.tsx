import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';

interface Props {
	options: any[];
	onChange: (event: any) => void;
	selectedValue: string;
}

export default function RadioButtonGroup({
	options,
	onChange,
	selectedValue,
}: Props) {
	return (
		<FormControl component="fieldset">
			<FormLabel>Sort</FormLabel>
			<RadioGroup
				onChange={onChange}
				value={selectedValue}
			>
				{options.map(({ value, label }) => (
					<FormControlLabel
						value={value}
						control={
							<Radio
								sx={{
									color: 'secondary',
									'&.Mui-checked': {
										color: '#13c552',
									},
								}}
							/>
						}
						label={label}
						key={value}
						sx={{ color: 'primary' }}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}


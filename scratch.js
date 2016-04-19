tasks = {	
	select_protocol: [
		{
			id:'uniquekey1',
			data: {
				selected_file: 'elisa.json', // DEFAULT
				previous_runs: [
					{
						id: 'foo1',
						filename: 'elisa.json',
						description: "FOOO",
						last_run: 'timestamp',
						run_count: 34,
						required: false,
						completed: false
					},
					{
						id: 'foo2',
						filename: 'talon.json',
						description: "BAR",
						last_run: 'timestamp',
						run_count: 234,
						required: false,
						completed: false
					}
				]
			}
		}
	],

	calibration: [
		{
			id: 'uniquekey2', 
			data: {
				required: false,
				completed: false,
				container_name: 'microplate.96.deepwell',
				deck_position: 'A1',
				x: 0,
				y: 0, 
				z: 0
			}
		}
	]

}

// Send selected protocol.
{ step_id: 'uniquekey1', data: { completed: true, selected_file: 'foo1' }}

// Upload new protocol.
// (foo2 generated as ID for uploaded protocol)
{ step_id: 'uniquekey1', data: { completed: true, selected_file: 'foo2' }}

// Change calibration
{ step_id: 'uniquekey2', data: { x: 1, y: 3, z: 10 } }

// Reuse the old calibration.
{ step_id: 'uniquekey2', data: { completed: true } }
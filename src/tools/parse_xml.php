<?php
	
	/**
	 * GOOD GOD I HATE XML
	 *
	 * This file is a clusterfuck of hacks and is definitely being re-written using SimpleXML
	 */
	
	$xml = new DOMDocument();
	
	$content = file_get_contents($argv[1]);
	$content = str_replace('xmlns="http://docbook.org/ns/docbook"', '', $content); // so much pain
	$content = preg_replace('/&(.*);/i', '{$1}', $content);

	if ($xml->loadXML($content) === false) {
		die('Could not load XML document: ' . var_export(error_get_last(), true));
	}

	
	/**
	 * @param DOMNode $node
	 * @param string  $name
	 * @return DOMNode[]
	 */
	function childrenByName(DOMNode $node, string $name): array {
		$found = [];
		
		/** @var DOMNode $child_node */
		foreach ($node->childNodes as $child_node) {
			if ($child_node->nodeName === $name) {
				$found[] = $child_node;
			}
		}
		return $found;
	}
	
	function buildSingleBlockContainer(string $text) {
		return [
			'data' => (object)[
				'blocks' => [
					[
						'data' => (object)[
							'translations' => [
								'en' => (object)[
									'meta' => (object)[],
									'data' => [
										'lang'     => 'en',
										'format'   => 'text',
										'contents' => $text,
									],
								],
							],
						],
					],
				],
			],
		];
	}
	
	
	function recursiveCollectText(DOMNodeList $nodes): string {
		$text = '';
		
		$copied_nodes = ['function', 'parameter', 'literal'];
		
		/** @var DOMNode $child_node */
		foreach ($nodes as $child_node) {
			if ($child_node instanceof DOMText) {
				$text .= trim($child_node->textContent);
			}
			else if (in_array($child_node->nodeName, $copied_nodes, true)) {
				$text.= ' <' . $child_node->nodeName . '>' . $child_node->textContent . '</' . $child_node->nodeName . '> ' ;
			}
			else {
				$text .= recursiveCollectText($child_node->childNodes);
			}
			
			if ($child_node->nodeName === 'para') {
				$text.= "\n\n";
			}
		}
		
		return $text;
	}
	
	// recursive($xml->documentElement, '');
	
	$fn_type   = '';
	$fn_params = [];
	
	$parameters = [];
	
	$xpath = new DOMXPath($xml);
	
	$fn_type = $xpath->query('*/methodsynopsis/type')[0]->textContent;
	
	/** @var DOMNode $fn_param */
	foreach ($xpath->query('*/methodsynopsis/methodparam') as $fn_param) {
		$type = childrenByName($fn_param, 'type')[0]->textContent;
		$name = childrenByName($fn_param, 'parameter')[0]->textContent;
		$opt  = $fn_param->attributes->getNamedItem('choice');
		
		printf("@param {%s} %s %s\n", $type, $name, $opt ? ' (optional)' : '');
		
		$parameters[$name] = [
			'name'        => $name,
			'type'        => $type,
			'optional'    => $opt !== null,
			'description' => '',
		];
	}
	
	function stripWhitespace(string $text) {
		$text = str_replace("\r", "", $text);
		$output_paragraphs = [];
		
		$paragraphs = explode("\n\n", $text);
		foreach ($paragraphs as $paragraph) {
			$lines = explode("\n", $paragraph);
			foreach ($lines as &$line) {
				$line = trim($line);
			}
			
			print_r($lines);
			
			$output_paragraphs[] = implode(" ", $lines);
		}
		
		return trim(implode("\n\n", $output_paragraphs));
	}
	
	$renderable_parameters = [];
	
	/** @var DOMNode $vle */
	foreach ($xpath->query('//varlistentry') as $vle) {
		$subject = $xpath->query('*/parameter', $vle)[0]->textContent;
		
		$ep = $parameters[$subject];
		
		$renderable_parameters[] = [
			'data' => (object)[
				'name' => $ep['name'],
				'optional' => $ep['optional'],
				'types' => [
					(object)[
						'data' => (object)[
							'type_name' => $ep['type'],
							'description' => buildSingleBlockContainer(stripWhitespace(recursiveCollectText($xpath->query('*/para', $vle)))),
						],
					],
				],
			],
		];
	}
	
	$json = [
		'meta' => (object)[],
		'data' => [
			'name' => '',
			'description' => buildSingleBlockContainer(''),
			'parameters' => $renderable_parameters,
		],
	];
	
	
	file_put_contents($argv[2], json_encode($json));
	
	